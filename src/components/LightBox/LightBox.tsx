// CSS
import styles from "./LightBox.module.css";

// Interface
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

export function LightBox() {
  const appConetxt = useContext(AppContext);
  if (!appConetxt) return;
  const { order, setShowLightBox } = appConetxt;

  return (
    <div className={styles.lightBox}>
      <div className={styles.lightBoxContent}>
        <div className={styles.closeButton}>
          <button onClick={() => setShowLightBox(false)}>X</button>
        </div>
        <h2>Chosen plan:</h2>
        <div>
          <h4>Your info:</h4>
          <ul>
            <li>
              <b>Name</b>: {order.name}
            </li>
            <li>
              <b>Email</b>: {order.email}
            </li>
            <li>
              <b>Phone Number</b>: {order.phone}
            </li>
          </ul>

          <h4>Plan info:</h4>
          <ul>
            <li>
              <b>Plan</b>: {order.plan}
            </li>
            <li>
              <b>Type</b>: {order.monthlyOrYearly}
            </li>
            <li>
              <b>Plan value</b>: ${order.planPrice}
            </li>
          </ul>

          <h4>Services</h4>
          {order.services.length > 0 ? (
            <ul>
              {order.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          ) : (
            <b>No service chosen.</b>
          )}

          <div className={styles.totalContainer}>
            <h4>
              Total{" "}
              {order.monthlyOrYearly === "Monthly" ? "per month" : "per year"}:
              ${order.total}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
