import React from 'react'
import { connect } from 'react-redux'
import { UPDATE_FORMS } from '../../redux/actions/types'

import './Filtrs.css'
import {getAll} from '../../redux/actions/post'

import Post from './../shared/Post/Post'
import Loading from './../shared/Loading/Loading'

class Filtrs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Отправленное имя: ' + window.location.href);
        event.preventDefault();
      }

    componentDidMount() {
        this.props.getAll()
    }
   
   







    render() {

        const { isLoading, posts, totalCount } = this.props.post
        return(

            <React.Fragment><div className="row mt-4">

                <div className="col-md-8 mx-auto">
                {window.location.href =='http://localhost:3000/find' &&( <div className='d1'>
                    
                       <form onSubmit={this.handleSubmit}>
                            <input vtype="text" value={this.state.value} onChange={this.handleChange} placeholder="Искать здесь..."></input>
                            <button type="submit"></button>
                        </form>
                    </div>)}
               

                    {isLoading && <Loading />}
                    {!isLoading && totalCount === 0 && (
                        <div className="text-center ">
                            <h2>There is nothing</h2>
                        </div>
                    )}
                    {posts.map((p) => { if (p.user.name == this.state.value) { return <Post post={p} key={p._id} TYPE={UPDATE_FORMS}/> } })}

                </div>
            </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getAll })(Filtrs)