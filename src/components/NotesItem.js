import React from 'react'

const NotesItem = (props) => {
    return (
        <div class="col-md-4 my-1">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <p class="card-text">{props.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut reprehenderit id repellendus? Officia, culpa debitis libero nam ratione, excepturi eligendi non corporis saepe laborum, tempora dolores consequuntur rerum necessitatibus. Quaerat eligendi animi quisquam.</p>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default NotesItem
