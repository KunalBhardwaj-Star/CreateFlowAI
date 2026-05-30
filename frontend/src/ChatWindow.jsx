import './ChatWindow.css';
import Chat from './Chat.jsx'

export default function ChatWindow(){
    return (
        <>
            <div className='chatWindow'>
                <div className='navbar'>
                    <span>FlowAI <i class="fa-solid fa-chevron-down"></i></span>
                    <div className="userIconDiv">
                        <span><i class="fa-solid fa-user"></i></span>
                    </div>
                </div>
                <Chat></Chat>
                <div className="chatInput">
                    <div className="userInput">
                        <input placeholder='Ask anything'>
                            
                        </input>
                        <div className="submit">
                            <i class="fa-solid fa-paper-plane"></i>
                        </div>
                        <p className='info'>
                            FlowAI can make mistakes. Check important info.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}