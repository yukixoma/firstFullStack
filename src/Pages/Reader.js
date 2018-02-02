import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Reader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            toPage: 0
        }
    }

    onChange = (e) => {
        let toPage = e.target.value;
        toPage = parseInt(toPage,10);
        this.setState({
            redirect: true,
            toPage
        })
    }

    render() {
        window.scrollTo(0, 0);
        let manga = localStorage.getItem("manga");
        manga = JSON.parse(manga);
        let result = [];
        let chapterSelect = [];
        let { redirect, toPage } = this.state;
        let { id, chapter } = this.props.match.params;

        if (redirect) {
            this.setState({
                redirect: false,
                toPage: 0
            })
            return <Redirect to={"/read/" + id + "/" + toPage} />
        }
        
        let next = parseInt(chapter, 10) + 1 === manga.length ? manga.length - 1 : parseInt(chapter, 10) + 1;
        let previous = parseInt(chapter, 10) - 1 < 0 ? 0 : parseInt(chapter, 10) - 1;
        for (let i = 0; i < manga[chapter][0].length; i++) {
            result.push(
                <div className="card-block">
                    <img key={i} className="img-fluid img-center" src={manga[chapter][0][i]} />
                </div>
            )
        }
        for (let i = 0; i < manga.length; i++) {
            chapterSelect.push(
                <option key={i} value={i}> Chapter {i + 1} </option>
            )
        }
        return (
            <div className="card" style={{ backgroundColor: "grey" }}>
                {result}
                <div className="container text-center" style={{ paddingBottom: 50 }}>
                    <Link to={"/read/" + id + "/" + previous} exact="true">
                        <button type="button" class="btn btn-danger mr-sm-5">
                            Pre
                        </button>
                    </Link>
                    <select class="custom-select mr-sm-5" value={chapter} onChange={this.onChange}>
                        {chapterSelect}
                    </select>
                    <Link to={"/read/" + id + "/" + next} exact="true">
                        <button type="button" class="btn btn-success mr-sm-5">
                            Next
                        </button>
                    </Link>
                </div>
            </div>

        )
    }
}

export default Reader;