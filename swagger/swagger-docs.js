// swagger/routes.js
/**
 * @openapi
 * /api/repositories:
 *   get:
 *     summary: Get repositories with pagination
 *     description: Returns a list of repositories with pagination support.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Number of repositories per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: List of repositories with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 repositories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       githubId:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       stars:
 *                         type: integer
 *                       url:
 *                         type: string
 *                       description:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: Error fetching repositories
 */

/**
 * @openapi
 * /api/repository:
 *   get:
 *     summary: Get repository by name or githubId
 *     description: Searches for a repository by name or GitHub ID.
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Repository name
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: githubId
 *         description: GitHub ID of the repository
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Repository found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 githubId:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 stars:
 *                   type: integer
 *                 url:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Either "name" or "githubId" must be provided
 *       404:
 *         description: Repository not found
 *       500:
 *         description: Error fetching repository
 */

/**
 * @openapi
 * /api/sync:
 *   post:
 *     summary: Sync with GitHub
 *     description: Initiates synchronization with GitHub and updates repository data.
 *     responses:
 *       200:
 *         description: Synchronization completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 nextSyncTime:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Error syncing with GitHub
 */

/**
 * @openapi
 * /api/setSyncInterval:
 *   post:
 *     summary: Set new sync interval
 *     description: Sets a new sync interval for synchronization with GitHub.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interval:
 *                 type: integer
 *                 description: Interval in milliseconds
 *     responses:
 *       200:
 *         description: Sync interval updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 nextSyncTime:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid interval
 *       500:
 *         description: Error setting the interval
 */
