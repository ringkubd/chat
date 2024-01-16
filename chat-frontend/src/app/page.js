'use client'
import "react-chat-elements/dist/main.css"
import { MessageBox, ChatList, Popup, Button  } from "react-chat-elements";
import {useState} from "react";
export default function Home() {
    const [show, setShow] = useState(false);
    const popup = {
        show:show,
        header:"Example Popup",
        headerButtons: [
            {
                type: "transparent",
                color: "black",
                text: "X",
                onClick: () => {
                    setShow(false);
                },
            },
        ],
        text:"Here is a sample popup component to use in your projects.",
        footerButtons: [
            {
                color: "white",
                backgroundColor: "#ff5e3e",
                text: "Cancel",
                onClick: () => {
                    setShow(false);
                },
            },
            {
                color: "white",
                backgroundColor: "lightgreen",
                text: "OK",
                onClick: () => {
                    setShow(false);
                },
            },
        ]
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MessageBox
          position='left'
          title='Burhan'
          type='text'
          text="Hi there !"
          date={new Date()}
          replyButton={true}
      />

      <MessageBox
          position="right"
          title="Emre"
          type="meetingLink"
          text="Click to join the meeting"
          date={new Date()}
          re
      />
        <ChatList
            className='chat-list'
            dataSource={[
                {
                    avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
                    alt: 'kursat_avatar',
                    title: 'Kursat',
                    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
                    date: new Date(),
                    unread: 3,
                }
            ]} />
        <Popup
            popup={popup}
        />
    </main>
  )
}
