import './Sidebar.css';

export default function Sidebar(){
    return (
        <>
            <section className='sidebar'>
                <button>
                    <img src="src/assets/blacklogo.png" alt="gpt logo" />
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>

                <ul className='history'>
                    <li>history 1</li>
                    <li>history 2</li>
                    <li>history 3</li>
                </ul>

                <div className='sign'>
                    <p>By Kunal &hearts;</p>
                </div>
            </section>
        </>
    )
}