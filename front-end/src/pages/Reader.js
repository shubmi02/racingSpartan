import React from 'react';
import CoolDiv from '../components/CoolDiv';
import ArticleList from '../components/ArticleList';

class Reader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            middleDivWidth: '55%',
            isLeftCollapsed: false,
            isRightCollapsed: false,
            articleNames: ['Article 1 with a kinda long title', 'short title', 'just a normal title'],
            articleTexts: [ `system (such as the file system) run in user space. In such systems, it is difficult to
            draw a clear boundary. Everything running in kernel mode is clearly part of the
            operating system, but some programs running outside it are arguably also part of it,
            or at least closely associated with it.
            Operating systems differ from user (i.e., application) programs in ways other
            than where they reside. In particular, they are huge, complex, and long-lived. The
            source code of the heart of an operating system like Linux or Windows is on the
            order of fiv e million lines of code or more. To conceive of what this means, think
            of printing out fiv e million lines in book form, with 50 lines per page and 1000
            pages per volume (larger than this book). It would take 100 volumes to list an operating system of this size—essentially an entire bookcase. Can you imagine getting a job maintaining an operating system and on the first day having your boss
            bring you to a bookcase with the code and say: Go learn that. And this is only
            for the part that runs in the kernel. When essential shared libraries are included,
            Windows is well over 70 million lines of code or 10 to 20 bookcases. And this
            excludes basic application software (things like Windows Explorer, Windows
            Media Player, and so on).
            It should be clear now why operating systems live a long time—they are very
            hard to write, and having written one, the owner is loath to throw it out and start
            again. Instead, such systems evolve over long periods of time. Windows 95/98/Me
            was basically one operating system and Windows NT/2000/XP/Vista/Windows 7 is
            a different one. They look similar to the users because Microsoft made very sure
            that the user interface of Windows 2000/XP/Vista/Windows 7 was quite similar to
            that of the system it was replacing, mostly Windows 98. Nevertheless, there were
            very good reasons why Microsoft got rid of Windows 98. We will come to these
            when we study Windows in detail in Chap. 11.
            Besides Windows, the other main example we will use throughout this book is
            UNIX and its variants and clones. It, too, has evolved over the years, with versions
            like System V, Solaris, and FreeBSD being derived from the original system,
            whereas Linux is a fresh code base, although very closely modeled on UNIX and
            highly compatible with it. We will use examples from UNIX throughout this book
            and look at Linux in detail in Chap. 10.
            In this chapter we will briefly touch on a number of key aspects of operating
            systems, including what they are, their history, what kinds are around, some of the
            basic concepts, and their structure. We will come back to many of these important
            topics in later chapters in more detail.`],
            summary: `Summary text goes here.`,
        };
    }


    render() {
        const element2 = (
            <ArticleList articleNames={this.state.articleNames} />
        )

        return (
            <div>
                <div >
                    <CoolDiv element={element2} up={20} left={10} width={10} height = {20}/>
                </div>
                
            </div>
        );
    }
}

export default Reader;
