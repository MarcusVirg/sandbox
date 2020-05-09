// import Categories from '../data/categories.json'
// import Concepts from '../data/concepts.json'

// Simulate api request for now
export default (data, isError) =>
  new Promise((resolve, reject) => {
    switch (data) {
      case 'categories':
        setTimeout(() => {
          isError
            ? reject({ error: 'Something went wrong' })
            : resolve({ data: Categories.categories })
        }, 1000)
        break
      case 'concepts':
        setTimeout(() => {
          isError
            ? reject({ error: 'Something went wrong' })
            : resolve({
                data: {
                  concepts: Concepts.concepts,
                  demographics: Concepts.demographics
                }
              })
        }, 1000)
        break
      case 'submit':
        setTimeout(() => {
          isError
            ? reject({ error: 'Something went wrong' })
            : resolve({ status: 200 })
        }, 1000)
        break
      default:
        reject(new Error('No data of this type'))
    }
  })
