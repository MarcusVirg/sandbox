import React from 'react'
import ReactDOM from 'react-dom'
import faker from 'faker'
import CommentDetail from './CommentDetail'
import ApprovalCard from './ApprovalCard'

const root = document.querySelector('#root')

const App = () => {
    return (
        <div className="ui container comments">
            <ApprovalCard>
                <CommentDetail
                    author="Michael"
                    timeAgo="Today at 4:30PM"
                    text="Nice post bro!"
                    avatarUrl={faker.image.avatar()}
                />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail
                    author="Linda"
                    timeAgo="Today at 4:45PM"
                    text="What are you talking about?"
                    avatarUrl={faker.image.avatar()}
                />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail
                    author="Marcus"
                    timeAgo="Today at 5:00PM"
                    text="No one really knows tbh..."
                    avatarUrl={faker.image.avatar()}
                />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail
                    author="Drake"
                    timeAgo="Today at 8:00PM"
                    text="Ya'll dumb af."
                    avatarUrl={faker.image.avatar()}
                />
            </ApprovalCard>
        </div>
    )
}

ReactDOM.render(<App />, root)