import React from 'react';
import CoolDiv from '../components/CoolDiv';
import ArticleList from '../components/ArticleList';
import TextViewer from '../components/TextViewer';
import SummaryViewer from '../components/SummaryViewer';
import QuestionEntry from '../components/QuestionEntry';
import PdfTextReader from '../components/PdfTextReader';
import axios from 'axios';

class Reader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLeftCollapsed: false,
            isRightCollapsed: false,
            articleNames: [],
            articleTexts: [],
            summary: `Summary text goes here.`,
            highlightedText: `From a strict mathematical point of view, we may consider the (theoretical) existence of physical universes having properties which differ from the actual one which we are aware of and experience. Only universes for which “locality” and “invariances” are features allow for science to be possible.
            By locality, we mean that to analyze and understand any given system, bounded in space, only other nearby systems need to be taken into consideration. For example, to investigate the motion of the earth in the solar system, a very good approximation is to include only the presence of the sun; the other solar bodies have little influence. Likewise, a study of tides on the earth requires only the inclusion of the sun and moon. The effects of the other planets, the distant stars, and other objects in the galaxy are negligible. In summary, the existence of a condition of locality means that we can study
            Published by Digital Commons @ the Georgia Academy of Science, 2016 3
            Georgia Journal of Science, Vol. 74 [2016], Art. 3
            particular phenomena without knowing what everything else is doing in the physical universe. At a higher level of theoretical analysis, the locality principal places strong restrictions on the types of forces which can exist in the physical universe.
            Invariances are related to symmetries. A system is said to have a symmetry if you can “do something” to it and the properties of the system do not change. For example, a book may be rotated by 360o to give the same book in its original orientation. If you closed your eyes before the rotation, then upon opening them, there is no way to determine if the book was rotated zero, one, or ten times.
            Symmetry principles play important roles in science, mainly through their connection with conservation laws (Arnold 1989; Holton and Brush 2001; Simonyi 2012). In brief, if a system has a symmetry, then something is invariant or constant; if a system has an invariant, then there is a corresponding symmetry. Within the context of physics, the following such connections hold (Arnold 1989; Simonyi 2012):To illustrate these principles, consider the simple experiment of heating a cup of water for tea. The experiment is this: 1) Place water in a cup. 2) Heat the water in a microwave. 3) Remove the cup with the hot water and place a teabag in the hot water. 4) Remove the teabag after 5 min and drink the tea. This experiment can be done today, tomorrow, and was done yesterday. In all cases, the results are the same, namely, a delicious cup of tea. Our conclusion is that the “experiment” gives the same outcome whenever we do it, i.e., when it is done (the time) does not play a role. In a similar manner, the tea could be made in Atlanta, New York, or Nashville, with the same expected outcome.
            This experiment, while elementary, demonstrates that its end result, namely, a delicious cup of tea, is independent of both where it is done (location) and when (time). As indicated above the existence of a symmetry implies something does not change, e.g., a conservation law holds, and, likewise, if something is (always) constant for a system, then some symmetry holds for the system.
            To recapitulate, science is only possible if there exists locality and invariances in the physical universe. These principles allow experiments to be repeated at different times and locations, and because of these features it is then possible to create “public knowledge,” i.e., science.
            `,
            extra: {
                currDoc: 0
            }
        };
    }

    async componentDidMount() {
        if (!localStorage.getItem('uid')) {
            window.location.href = '/';
            return;
        }

        let body = {}
        //seperate into async routines that run on their own
        body = {
            ClassID: localStorage.getItem('ClassID')
        }
        let result = await axios.post(`http://localhost:5000/api/getArticles`, body);
        let newArticleNames = [];
        let newArticleByte64 = [`JVBERi0xLjMKJcfsj6IKNSAwIG9iago8PAovVGl0bGUgKP7/KQovQ3JlYXRpb25EYXRlIChEOjIwMjIwNDE4MTQxMDArMDInMDAnKQovUHJvZHVjZXIgKEE6MDAwMDAwMDAwMDAwMDAwMDAyIC0yMDIxLzA0LzEyKQovQ29tcG9uZW50cyA0IDAgUj4+CmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyA8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDExMDAwCi9TdWJ0eXBlIC9UeXBlMQovUGFnZXMgMiAwIFIKL0JpdHNQZXJDb21wb25lbnQgNDYgMCBSCi9Db250ZW50cyA1IDAgUj4+CmVuZG9iago3IDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyA8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDExMDAwCi9TdWJ0eXBlIC9UeXBlMQovUGFnZXMgMiAwIFIKL0JpdHNQZXJDb21wb25lbnQgNTcgMCBSCi9Db250ZW50cyA2IDAgUj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyA8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDExMDAwCi9TdWJ0eXBlIC9UeXBlMQovUGFnZXMgMiAwIFIKL0JpdHNQZXJDb21wb25lbnQgNjggMCBSCi9Db250ZW50cyA3IDAgUj4+CmVuZG9iago5IDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyA8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDExMDAwCi9TdWJ0eXBlIC9UeXBlMQovUGFnZXMgMiAwIFIKL0JpdHNQZXJDb21wb25lbnQgODAgMCBSCi9Db250ZW50cyA4IDAgUj4+CmVuZG9iagoxCjw8Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9MZW5ndGggMTAwMDAKL1N1YnR5cGUgL1R5cGUxCi9QYWdlcyAyIDAgUgo+PgovQmFzZUZvbnQKL1RleHQKL0ltYWdlCi9SZXNvdXJjZXMgMyAwIFIKL0ZvbnRGYW1pbHkKPj4Kc3RyZWFtCnicbK1SXU3JKi5ptVm5rcUoqLnJjVlJTJy5yY3JWUlMuX2pzUkqLmVDVFJzUmNydEpVLmNsaWNrKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq`];

        for (let article of result.data.articles) {
            newArticleNames.push(article.articleName);
            newArticleByte64.push(article.file);
        }
        this.setState({articleNames: newArticleNames});
        this.setState({articleTexts: newArticleByte64});
        // dont use until demo cuz lotta computation
        // body = {
        //     text: this.state.highlightedText
        // }
        // result = await axios.post(`http://localhost:5000/api/getSummary`, body);
        // if (result.data) {
        //     this.setState({summary: result.data});
        // }
        


    }


    render() {
        const element1 = (
            <ArticleList articleNames={this.state.articleNames} />
        )
        const element2 = (
            // <TextViewer text={this.state.articleTexts[0]} />
            // <img src={this.state.articleTexts[0]} style={{ width: '100%', height: '100%' }} />
            <PdfTextReader base64Pdf={this.state.articleTexts[0]}/>
        )
        const element3 = (
            <SummaryViewer text={this.state.summary} />
        )
        const backButton = (
            <button>Back</button>
        )
        const submitButton = (
            <button>Submit</button>
        )
        const getSummaryButton = (
            <button>Get Summary</button>
        )
        const enterAnswerField = (
            <QuestionEntry/>
        )

        return (
            <div>
                <h1> Reader page </h1>
                <div >
                    <CoolDiv element={element1} up={22.5} left={5} width={15} height = {20}/>
                </div>
                <div >
                    <CoolDiv element={element2} up={20} left={20} width={55} height = {50}/>
                </div>
                <div >
                    <CoolDiv element={element3} up={20} left={75} width={20} height = {50}/>
                </div>
                <div>
                    <CoolDiv element={backButton} up={20} left={2.5} width={20} height = {50}/>
                </div>
                <div>
                    <CoolDiv element={submitButton} up={80} left={40} width={20} height = {50}/>
                </div>
                <div>
                    <CoolDiv element={getSummaryButton} up={69} left={75} width={20} height = {50}/>
                </div>
                <div>
                    <CoolDiv element = {enterAnswerField} up={60} left={40} width={20} height = {50}/>
                </div>
                
            </div>
        );
    }
}

export default Reader;
