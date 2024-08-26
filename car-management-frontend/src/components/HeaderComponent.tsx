import styles from '../styles/Components.module.css';

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className="navbar navbar-dark bg-primary">
                <a className={`navbar-brand ${styles.Header}`} href='/cars'>My Cars</a>
            </nav>
        </header>
        
    </div>
  )
}

export default HeaderComponent