// CSS
import styles from './SystemMessages.module.css'

// Interfaces
import { MessageProps } from "../../interfaces/Message"

interface SystemMessagesProps {
  message: MessageProps
}

export function SystemMessages({ message }: SystemMessagesProps) {

  return (
    <>
      {
        message.type === 200 &&
        (
          <div className={styles.successMessage}>
            <h4>{message.message}</h4>
          </div>
        )
      }

      {
        message.type === 422 &&
        (
          <div className={styles.warningMessage}>
            <h4>{message.message}</h4>
          </div>
        )
      }

      {
        message.type === 401 &&
        (
          <div className={styles.warningMessage}>
            <h4>{message.message}</h4>
          </div>
        )
      }

      {
        message.type === 406 &&
        (
          <div className={styles.warningMessage}>
            <h4>{message.message}</h4>
          </div>
        )
      }
    </>
  )
}