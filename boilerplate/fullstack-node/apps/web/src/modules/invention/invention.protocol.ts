import { useMutation, useQuery } from '@tanstack/react-query'
import http, { BASE_URL } from '@/modules/common/http'
import queryClient from '@/modules/common/queryClient'
import { Invention } from '@/modules/invention/invention.types'

export async function getInventions() {
	const { data, isError, error } = await http.get<Invention[]>('/inventions')
	if (isError) throw new Error(error)
	return data
}

export async function getInvention(id: string) {
	const { data, isError, error } = await http.get<Invention>(`/inventions/${id}`)
	if (isError) throw new Error(error)
	return data
}

export async function deleteInvention(id: string) {
	const { isError, error } = await http.delete(`/inventions/${id}`)
	if (isError) throw new Error(error)
}

export function useInventions() {
	return useQuery({ queryKey: ['inventions'], queryFn: getInvention })
}

export function useInvention(id: string) {
	return useQuery({ queryKey: ['inventions', id], queryFn: () => getInventions(id) })
}

export function useDeleteInvention() {
	return useMutation({
		mutationFn: deleteInvention,
		onMutate: async (inventionId: string) => {
			await queryClient.cancelQueries({ queryKey: ['inventions'] })

			const previousInvention = queryClient.getQueryData<Invention>(['inventions', inventionId])

			queryClient.setQueryData(['inventions'], (inventions: Invention[]) =>
				inventions.filter((p) => p.id !== inventionId)
			)

			return { previousInvention }
		},
		onError: (_err, _inventionInfo, context) => {
			queryClient.setQueryData(['inventions'], (inventions: Invention[]) => {
				if (!context?.previousInvention) return inventions
				inventions.push(context.previousInvention)
				return inventions
			})
		},
		onSettled: () => {
			return queryClient.invalidateQueries({ queryKey: ['inventions'] })
		}
	})
}
