import styles from './Container.module.css'

function Container(props){
    return(
        <div className={`${styles.container} ${styles[props.customClass] }`}>
            {props.children}</div> //direncionando onde o conteudo em baixo do container vai aparecer
    )
}

export default Container;