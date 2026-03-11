import { Router } from 'express'
import {
	postThreadController,
	getThreadByThreadIdController,
	getThreadsByProfileIdController,
	getThreadsByReplyThreadIdController,
	getThreadsByFollowingController,
	getThreadsByKeywordController,
	searchThreadsController,
	deleteThreadController
} from './thread.controller.ts'
import { isLoggedInController } from '../../utils/controllers/is-logged-in.controller.ts'

const basepath = '/apis/thread' as const
const router = Router()

/**
 * POST /apis/thread
 * Create a new thread/tweet (requires authentication)
 */
router.route('/')
	.post(isLoggedInController, postThreadController)

/**
 * GET /apis/thread/following
 * Get recent threads from profiles the authenticated user is following (requires authentication)
 */
router.route('/following')
	.get(isLoggedInController, getThreadsByFollowingController)

/**
 * GET /apis/thread/search?q=searchTerm&limit=50
 * Search threads by content (query parameter 'q' is required)
 */
router.route('/search')
	.get(searchThreadsController)

/**
 * GET /apis/thread/tag/:keyword
 * Get threads by keyword/tag name
 */
router.route('/tag/:keyword')
	.get(getThreadsByKeywordController)

/**
 * GET /apis/thread/profile/:profileId
 * Get all threads by a specific profile ID
 */
router.route('/profile/:profileId')
	.get(getThreadsByProfileIdController)

/**
 * GET /apis/thread/reply/:replyThreadId
 * Get all threads that are replies to a specific thread
 */
router.route('/reply/:replyThreadId')
	.get(getThreadsByReplyThreadIdController)

/**
 * GET /apis/thread/:threadId
 * Get a specific thread by its ID
 *
 * DELETE /apis/thread/:threadId
 * Delete a thread by its ID (requires authentication and ownership)
 */
router.route('/:threadId')
	.get(getThreadByThreadIdController)
	.delete(isLoggedInController, deleteThreadController)

export const threadRoute = { basepath, router }