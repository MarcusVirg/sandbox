export type Node = {
	id: string
	name: string
	attributes: Record<string, string>
}

export type GraphEdge = {
	source: Node['id']
	target: Node['id']
}

export type Graph = {
	nodes: Node[]
	edges: GraphEdge[]
}

export const orgChart: Graph = {
	nodes: [
		{ id: 'f01a2', name: 'Chief Executive Officer', attributes: { salary: '800k' } },
		{ id: '2Y2Tb', name: 'President of Marketing', attributes: { salary: '420k' } },
		{ id: 'ptABI', name: 'President of Product', attributes: { salary: '500k' } },
		{ id: '9e1uX', name: 'Marketing Manager', attributes: { salary: '220k' } },
		{ id: '45vxh', name: 'Internal Tools Engineering Manager', attributes: { salary: '250k' } },
		{ id: 'anK5x', name: 'Product Engineering Manager', attributes: { salary: '250k' } },
		{ id: 'OXCoq', name: 'Marketing Guru', attributes: { salary: '120k' } },
		{ id: 'DeIMC', name: 'Marketing Intern', attributes: { salary: '50k' } },
		{ id: '5KDBa', name: 'SWE Intern', attributes: { salary: '60k' } },
		{ id: 'sNFYt', name: 'SWE', attributes: { salary: '130k' } },
		{ id: 'wkInt', name: 'SWE', attributes: { salary: '160k' } },
		{ id: 'VxIOc', name: 'Product Designer', attributes: { salary: '125k' } },
		{ id: 'wLJcL', name: 'SWE', attributes: { salary: '150k' } }
	],
	edges: [
		{ source: 'f01a2', target: 'ptABI' },
		{ source: 'f01a2', target: '2Y2Tb' },
		{ source: '2Y2Tb', target: '9e1uX' },
		{ source: '9e1uX', target: 'OXCoq' },
		{ source: '9e1uX', target: 'DeIMC' },
		{ source: 'ptABI', target: '45vxh' },
		{ source: 'ptABI', target: 'anK5x' },
		{ source: '45vxh', target: '5KDBa' },
		{ source: '45vxh', target: 'sNFYt' },
		{ source: '45vxh', target: 'wkInt' },
		{ source: 'anK5x', target: 'VxIOc' },
		{ source: 'anK5x', target: 'wLJcL' }
	]
}

const visual = `
Chief Executive Officer (800k)
├── President of Product (500k)
│   ├── Internal Tools Engineering Manager (250k)
│   │   ├── SWE Intern (60k)
│   │   ├── SWE (130k)
│   │   └── SWE (160k)
│   └── Product Engineering Manager (250k)
│       ├── Product Designer (125k)
│       └── SWE (150k)
└── President of Marketing (420k)
    └── Marketing Manager (220k)
        └── Marketing Guru (120k)
        └── Marketing Intern (50k)
`
