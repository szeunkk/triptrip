"use client";

import { useEffect, useState } from "react";
import { getPokeMon } from "./getPokemon";
import styles from "./styles.module.css";

export default function PokemonItem({ number }: { number: number }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    height: 0,
    weight: 0,
    sprites: "",
    koreanName: "",
    koreanGenus: "",
    flavor_text_entries: { flavor_text: "" },
    color: { light: "", normal: "", dark: "" },
  });
  useEffect(() => {
    getPokeMon(number).then((res) => {
      setData({
        id: String(res.id),
        name: res.name,
        height: res.height,
        weight: res.weight,
        sprites: res.sprites,
        koreanName: res.koreanName ?? "",
        koreanGenus: res.koreanGenus ?? "",
        flavor_text_entries: {
          flavor_text: res.flavor_text_entries.flavor_text,
        },
        color: res.color,
      });
    });
  }, [number]);

  const { id, name, height, weight, sprites, koreanName, koreanGenus, flavor_text_entries, color } = data;

  const { light, normal, dark } = color;

  return (
    <div
      className={styles.cardContainer}
      style={{ "--poke-light-color": light, "--poke-dark-color": dark } as React.CSSProperties}
    >
      <div
        className={styles.pokemon}
        style={{
          backgroundImage: `url(${sprites})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div
          className={styles.nameGroup}
          style={{ "--poke-light-color": light, "--poke-dark-color": dark } as React.CSSProperties}
        >
          <div className={styles.Name} style={{ "--poke-light-color": light } as React.CSSProperties}>
            <div>{koreanName ?? ""}</div>
            <p>{name ?? ""}</p>
          </div>
          No. {id ? String(id).padStart(4, "0") : ""}
        </div>
        {/* <img src={sprites?? ""} style={{width: "100%", height: "70%", objectFit: "cover", position: "absolute", zIndex: 0}}/> */}

        <div
          className={styles.ContentsGroup}
          style={{ "--poke-normal-color": normal, "--poke-light-color": light } as React.CSSProperties}
        >
          <div>
            <p>{koreanGenus ?? "???"}</p>
            <div className={styles.spec}>
              <div>{height ? String(Number(height) / 10) + "cm" : "???"}</div>|
              <div>{weight ? String(Number(weight) / 10) + "kg" : "???"}</div>
            </div>
          </div>
          <div>{flavor_text_entries.flavor_text ?? ""}</div>
        </div>
      </div>
    </div>
  );
}
