import { z } from 'zod/v4'
import { sql } from '../../utils/database.utils.ts'

/**
 * Schema for validating thread objects
 * @shape id: string the primary key for the thread
 * @shape profileId: string the foreign key to the profile that created the thread
 * @shape replyThreadId: string | null the foreign key to the thread being replied to
 * @shape content: string the content of the thread (max 140 characters)
 * @shape datetime: Date the timestamp when the thread was created
 * @shape imageUrl: string | null optional image URL for the thread
 */
export const ThreadSchema = z.object({
	id: z.uuidv7('Please provide a valid uuid for thread id'),
	profileId: z.uuidv7('Please provide a valid uuid for profile id'),
	replyThreadId: z.uuidv7('Please provide a valid uuid for reply thread id').nullable(),
	content: z.string('Please provide valid content')
		.min(1, 'content cannot be empty')
		.max(140, 'content cannot exceed 140 characters')
		.trim(),
	datetime: z.coerce.date('Please provide a valid datetime'),
	imageUrl: z.url('Please provide a valid image url')
		.max(255, 'image url cannot exceed 255 characters')
		.trim()
		.nullable()
})

/**
 * Thread type inferred from schema
 *Im
 */
export type Thread = z.infer<typeof ThreadSchema>

/**
 * Insert a new thread into the database
 * @param thread the thread object to insert
 * @returns "Thread successfully created"
 */
export async function insertThread(thread: Thread): Promise<string> {
	// Validate the thread object against the ThreadSchema
	ThreadSchema.parse(thread)

	await sql`
		INSERT INTO thread (id, profile_id, reply_thread_id, content, image_url)
		VALUES (${thread.id}, ${thread.profileId}, ${thread.replyThreadId}, ${thread.content}, ${thread.imageUrl})
	`

	return 'Thread successfully created'
}

/**
 * Select a thread by its ID
 * @param threadId the id of the thread to select
 * @returns the thread or null if not found
 */
export async function selectThreadByThreadId(threadId: string): Promise<Thread | null> {
	const rowList = await sql`
		SELECT id, profile_id, reply_thread_id, content, datetime, image_url
		FROM thread
		WHERE id = ${threadId}
	`

	// Enforce that the result is an array of one thread, or null
	const result = ThreadSchema.array().max(1).parse(rowList)
	return result[0] ?? null
}

/**
 * Select all threads by a specific profile ID
 * @param profileId the id of the profile
 * @returns array of threads
 */
export async function selectThreadsByProfileId(profileId: string): Promise<Thread[]> {
	const rowList = await sql`
		SELECT id, profile_id, reply_thread_id, content, datetime, image_url
		FROM thread
		WHERE profile_id = ${profileId}
		ORDER BY datetime DESC
	`

	// Enforce that the result is an array of threads
	return ThreadSchema.array().parse(rowList)
}

/**
 * Select all threads that are replies to a specific thread
 * @param replyThreadId the id of the thread to get replies for
 * @returns array of threads that are replies to the specified thread
 */
export async function selectThreadsByReplyThreadId(replyThreadId: string): Promise<Thread[]> {
	const rowList = await sql`
		SELECT id, profile_id, reply_thread_id, content, datetime, image_url
		FROM thread
		WHERE reply_thread_id = ${replyThreadId}
		ORDER BY datetime DESC
	`

	// Enforce that the result is an array of threads
	return ThreadSchema.array().parse(rowList)
}

/**
 * Select recent threads from profiles that the given profile is following
 * @param profileId the id of the profile whose following list to check
 * @param limit the maximum number of threads to return (default 50)
 * @returns array of threads
 */
export async function selectThreadsByFollowing(profileId: string, limit: number = 50): Promise<Thread[]> {
	const rowList = await sql`
		SELECT thread.id, thread.profile_id, thread.reply_thread_id, thread.content, thread.datetime, thread.image_url
		FROM thread
		INNER JOIN follow ON thread.profile_id = follow.following_id
		WHERE follow.follower_id = ${profileId}
		ORDER BY thread.datetime DESC
		LIMIT ${limit}
	`

	// Enforce that the result is an array of threads
	return ThreadSchema.array().parse(rowList)
}

/**
 * Select threads by keyword/tag name
 * @param keywordName the name of the keyword/tag
 * @param limit the maximum number of threads to return (default 50)
 * @returns array of threads
 */
export async function selectThreadsByKeyword(keywordName: string, limit: number = 50): Promise<Thread[]> {
	const rowList = await sql`
		SELECT thread.id, thread.profile_id, thread.reply_thread_id, thread.content, thread.datetime, thread.image_url
		FROM thread
		INNER JOIN tag ON thread.id = tag.thread_id
		INNER JOIN keyword ON tag.keyword_id = keyword.id
		WHERE keyword.name = ${keywordName}
		ORDER BY thread.datetime DESC
		LIMIT ${limit}
	`

	// Enforce that the result is an array of threads
	return ThreadSchema.array().parse(rowList)
}

/**
 * Search threads by content (case-insensitive partial match)
 * @param searchTerm the search term to look for in thread content
 * @param limit the maximum number of threads to return (default 50)
 * @returns array of threads
 */
export async function searchThreadsByContent(searchTerm: string, limit: number = 50): Promise<Thread[]> {
	const rowList = await sql`
		SELECT id, profile_id, reply_thread_id, content, datetime, image_url
		FROM thread
		WHERE content ILIKE ${`%${searchTerm}%`}
		ORDER BY datetime DESC
		LIMIT ${limit}
	`

	// Enforce that the result is an array of threads
	return ThreadSchema.array().parse(rowList)
}

/**
 * Delete a thread by its ID
 * @param threadId the id of the thread to delete
 * @returns "Thread successfully deleted"
 */
export async function deleteThread(threadId: string): Promise<string> {
	await sql`
		DELETE FROM thread
		WHERE id = ${threadId}
	`

	return 'Thread successfully deleted'
}