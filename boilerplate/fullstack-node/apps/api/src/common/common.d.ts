declare namespace Express {
	interface Request {
		contract: Record<string, unknown>
	}
}
