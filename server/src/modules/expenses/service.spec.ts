import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getAllExpenses, createExpense, updateExpense, getExpenseById, deleteExpense } from './service';
import * as repository from './repository';
import { Expense } from './types';

// Mock the repository functions
vi.mock('./repository', () => ({
  findExpensesByUserId: vi.fn(),
  createExpense: vi.fn(),
  updateExpense: vi.fn(),
  findExpenseById: vi.fn(),
  deleteExpense: vi.fn()
}));

describe('Expense Service', () => {
  const mockUserId = '0196794c-b79a-7523-a6ef-db00fde0dbca';
  const mockExpense: Expense = {
    id: '123',
    title: 'Test Expense',
    description: 'Test Description',
    owner: mockUserId,
    created_at: new Date()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllExpenses', () => {
    it('should return expenses successfully', async () => {
      const mockExpenses = [mockExpense];
      vi.mocked(repository.findExpensesByUserId).mockResolvedValue(mockExpenses as any);

      const result = await getAllExpenses(mockUserId);

      expect(result.code).toBe(200);
      expect(result.data).toEqual(mockExpenses);
      expect(repository.findExpensesByUserId).toHaveBeenCalledWith(mockUserId);
    });

    it('should handle errors', async () => {
      vi.mocked(repository.findExpensesByUserId).mockRejectedValue(new Error('DB Error'));

      const result = await getAllExpenses(mockUserId);

      expect(result.code).toBe(500);
      expect(result.message).toBe('Failed to fetch expenses');
    });
  });

  describe('createExpense', () => {
    const createRequest = {
      title: 'New Expense',
      description: 'New Description'
    };

    it('should create expense successfully', async () => {
      vi.mocked(repository.createExpense).mockResolvedValue(mockExpense);

      const result = await createExpense(createRequest, mockUserId);

      expect(result.code).toBe(201);
      expect(result.data).toEqual(mockExpense);
      expect(repository.createExpense).toHaveBeenCalled();
    });

    it('should handle creation errors', async () => {
      vi.mocked(repository.createExpense).mockRejectedValue(new Error('DB Error'));

      const result = await createExpense(createRequest, mockUserId);

      expect(result.code).toBe(500);
      expect(result.message).toBe('Failed to create expense');
    });
  });

  describe('updateExpense', () => {
    const updateRequest = {
      title: 'Updated Title',
      description: 'Updated Description'
    };
    const expenseId = '123';

    it('should update expense successfully', async () => {
      const updatedExpense = { ...mockExpense, ...updateRequest };
      vi.mocked(repository.updateExpense).mockResolvedValue(updatedExpense);

      const result = await updateExpense(expenseId, updateRequest, mockUserId);

      expect(result.code).toBe(200);
      expect(result.data).toEqual(updatedExpense);
      expect(repository.updateExpense).toHaveBeenCalledWith(expenseId, mockUserId, updateRequest);
    });

    it('should handle not found case', async () => {
      vi.mocked(repository.updateExpense).mockResolvedValue(null!);

      const result = await updateExpense(expenseId, updateRequest, mockUserId);

      expect(result.code).toBe(404);
      expect(result.message).toBe('Expense not found or you don\'t have permission to update it');
    });

    it('should handle update errors', async () => {
      vi.mocked(repository.updateExpense).mockRejectedValue(new Error('DB Error'));

      const result = await updateExpense(expenseId, updateRequest, mockUserId);

      expect(result.code).toBe(500);
      expect(result.message).toBe('Failed to update expense');
    });
  });

  describe('getExpenseById', () => {
    const expenseId = '123';

    it('should get expense by id successfully', async () => {
      vi.mocked(repository.findExpenseById).mockResolvedValue(mockExpense);

      const result = await getExpenseById(expenseId, mockUserId);

      expect(result.code).toBe(200);
      expect(result.data).toEqual(mockExpense);
      expect(repository.findExpenseById).toHaveBeenCalledWith(expenseId, mockUserId);
    });

    it('should handle not found case', async () => {
      vi.mocked(repository.findExpenseById).mockResolvedValue(null!);

      const result = await getExpenseById(expenseId, mockUserId);

      expect(result.code).toBe(404);
      expect(result.message).toBe('Expense not found or you don\'t have permission to view it');
    });

    it('should handle fetch errors', async () => {
      vi.mocked(repository.findExpenseById).mockRejectedValue(new Error('DB Error'));

      const result = await getExpenseById(expenseId, mockUserId);

      expect(result.code).toBe(500);
      expect(result.message).toBe('Failed to fetch expense');
    });
  });

  describe('deleteExpense', () => {
    const expenseId = '123';

    it('should delete expense successfully', async () => {
      vi.mocked(repository.deleteExpense).mockResolvedValue(mockExpense);

      const result = await deleteExpense(expenseId, mockUserId);

      expect(result.code).toBe(200);
      expect(result.data).toEqual(mockExpense);
      expect(repository.deleteExpense).toHaveBeenCalledWith(expenseId, mockUserId);
    });

    it('should handle not found case', async () => {
      vi.mocked(repository.deleteExpense).mockResolvedValue(null!);

      const result = await deleteExpense(expenseId, mockUserId);

      expect(result.code).toBe(404);
      expect(result.message).toBe('Expense not found or you don\'t have permission to delete it');
    });

    it('should handle delete errors', async () => {
      vi.mocked(repository.deleteExpense).mockRejectedValue(new Error('DB Error'));

      const result = await deleteExpense(expenseId, mockUserId);

      expect(result.code).toBe(500);
      expect(result.message).toBe('Failed to delete expense');
    });
  });
});