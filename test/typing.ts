export type ExecCbkType = (stdout: string, stderr: string) => void

export type PatternResType = { name?: string, [ k: string ]: any }

export type CountResType = { name?: string, count?: number, [ k: string ]: any }

export type ExtractFunRetType = string | null | any[] | undefined