import TaskCard from '../components/TaskCard/TaskCard';
import { taskData } from '../data/taskData';
import './Layout.css'

const Layout = () => {
    return (
        <div className="app-shell">
            <section className="app-shell__content" aria-label="Task card demo">
                <div className="app-shell__intro">
                    <p className="app-shell__kicker">Productivity App UI</p>
                    <h1 className="app-shell__heading">A task card with startup energy</h1>
                    <p className="app-shell__subheading">
                        Structured as reusable components, powered by data, and updated with a live time hint.
                    </p>
                </div>
                <TaskCard task={taskData} />
            </section>
        </div>
    )
}

export default Layout