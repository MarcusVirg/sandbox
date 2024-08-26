import type { Request, Response, NextFunction } from 'express'
import type { z } from 'zod'
import StatusCodes from '@/common/status-codes'

export function validateBody<C extends z.AnyZodObject>(contract: C) {
	return (req: Request, res: Response, next: NextFunction) => {
		const result = contract.safeParse(req.body)
		if (!result.success) {
			const errorMessages = result.error.errors.map((issue) => ({
				message: `${issue.path.join('.')} ${issue.message}`
			}))

			res.status(StatusCodes.BAD_REQUEST).json({
				error: 'Invalid Data',
				details: errorMessages
			})
			return
		}

		req.contract = result.data as z.infer<C>
		next()
	}
}
