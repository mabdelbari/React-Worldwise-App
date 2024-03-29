import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../../hooks/useCities";
import { useEffect } from "react";
import { flagemojiToPNG, formatDate } from "../../utils";

import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

import styles from "./City.module.css";

export default function City() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {emoji && <span>{flagemojiToPNG(emoji)}</span>}
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type={"back"}
          onClick={() => {
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}
