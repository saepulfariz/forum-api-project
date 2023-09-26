const RegisterThread = require('../../../../Domains/threads/entities/RegisterThread');
const RegisteredThread = require('../../../../Domains/threads/entities/RegisteredThread');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'dicoding',
      body: 'Dicoding Indonesia',
    };

    const owner = 'user-123';

    const mockRegisteredThread = new RegisteredThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredThread));

    /** creating use case instance */
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository
    });

    // Action
    const registeredThread = await getThreadUseCase.execute(useCasePayload, owner);

    // Assert
    expect(registeredThread).toStrictEqual(new RegisteredThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner,
    }));

    expect(mockThreadRepository.addThread).toBeCalledWith(new RegisterThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
    }), owner);
  });
});
