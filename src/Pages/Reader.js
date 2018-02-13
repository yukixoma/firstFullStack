import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Reader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            server: 0,
        }
    }

    onChange = e => {
        let toPage = e.target.value;
        toPage = parseInt(toPage, 10);
        let { id } = this.props.match.params;
        window.location.replace("/read/" + id + "/" + toPage)
    }

    onChangeServer = e => {
        let { value } = e.target;
        value = parseInt(value, 10);
        this.setState({ server: value })
    }

    render() {
        window.scrollTo(0, 0);
        let result = [];
        let chapterSelect = [];
        let serverSelect = [];
        let { server } = this.state;
        let { id, chapter } = this.props.match.params;
        let allManga = localStorage.getItem("allManga");
        allManga = JSON.parse(allManga);
        let manga = allManga.filter(e => {
            return e._id === id;
        })
        let mangaName = manga[0].name;
        manga = manga[0].chapter;
        chapter = parseInt(chapter, 10);

        let next = chapter + 1 === manga.length ? manga.length - 1 : chapter + 1;
        let previous = chapter - 1 < 0 ? 0 : chapter - 1;



        if (manga[chapter][server].length === 0) {
            manga[chapter].map((e, index) => {
                if (e.length !== 0) server = index;
            })
        }

        for (let i = 0; i < manga[chapter][server].length; i++) {
            result.push(
                <div className="card-block">
                    <img key={i} className="img-fluid img-center" src={manga[chapter][server][i]} />
                </div>
            )
        }
        for (let i = 0; i < manga.length; i++) {
            chapterSelect.push(
                <option key={i} value={i}> Chapter {i + 1} </option>
            )
        }

        for (let i = 0; i < manga[chapter].length; i++) {
            serverSelect.push(
                <option key={i} value={i}> Server {i + 1}  </option>
            )
        }
        return (
            <div className="card" style={{ backgroundColor: "grey" }}>
                <div className="container text-center" style={{ paddingBottom: 50 }}>
                    <h1 style={{ color: "white", marginTop: 50, marginBottom: 50 }}>
                        {mangaName} chapter {chapter + 1}
                    </h1>
                    <Link to={"/read/" + id + "/" + previous} exact="true">
                        <button type="button" class="btn btn-danger mr-sm-5">
                            Prev
                        </button>
                    </Link>
                    <select class="custom-select mr-sm-5" value={chapter} onChange={this.onChange}>
                        {chapterSelect}
                    </select>
                    <select class="custom-select mr-sm-5" value={server} onChange={this.onChangeServer}>
                        {serverSelect}
                    </select>
                    <Link to={"/read/" + id + "/" + next} exact="true">
                        <button type="button" class="btn btn-success mr-sm-5">
                            Next
                        </button>
                    </Link>
                </div>
                {result}
                <div className="container text-center" style={{ paddingBottom: 50 }}>
                    <Link to={"/read/" + id + "/" + previous} exact="true">
                        <button type="button" class="btn btn-danger mr-sm-5">
                            Prev
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