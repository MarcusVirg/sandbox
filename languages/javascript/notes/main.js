// const element = document.createElement('div')

// **React.createElement API**
// element.textContent = 'Hello World'
// element.className = 'container'
// rootElement.appendChild(element)
// const element = React.createElement('div', {className: 'container'}, 'Hello World')
// console.log(element)

// **JSX**
// const content = 'Hello World'
// const myClassName = 'container'
// const props = {
//     className: 'container',
//     children: content
// }
// const element = <div {...props} />

const rootElement = document.getElementById('root')

const Message = (props) => <div>{props.msg}</div>
const element = (
    <div className='container'>
        <Message msg="Hello World!!!" />
        <Message msg="Goodbye World!!!" />
    </div>
)

ReactDOM.render(element, rootElement)
