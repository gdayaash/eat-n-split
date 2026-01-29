import { useState } from "react";

const members = [
  { name: "Scarlett", id: 1 },
  { name: "Eugene", id: 2 },
  { name: "Frozen", id: 3 },
];

export default function App() {
  function handleCardSubmit(id, name) {
    console.log(id, name);
  }
  return (
    <section>
      <main>
        <h1>Eat-N-Split</h1>
        <Usercard members={members} handleCardSubmit={handleCardSubmit} />
      </main>
    </section>
  );
}

function Usercard({ members, handleCardSubmit }) {
  return (
    <section>
      {members.map((e) => (
        <Profile
          name={e.name}
          key={e.id}
          id={e.id}
          handleSubmit={handleCardSubmit}
        />
      ))}
    </section>
  );
}

function Profile({ name, id, handleSubmit }) {
  return (
    <article className="user-card">
      <aside className="profile-info">
        <span>
          <img src="https://i.pravatar.cc" alt={name} />
        </span>
        <span className="content-box">
          <p>{name}</p>
          <p>{id}</p>
        </span>
      </aside>

      <aside>
        <button onClick={() => handleSubmit(id, name)}>Select</button>
      </aside>
    </article>
  );
}

function BillCard({}) {
  return (
    <div className="card-wrapper">
      <form>
        <ul className="bill-inputs">
          <legend>Split With</legend>
          <li>
            <span>💰 Bill value</span>
            <span>
              <input type="number" value={2} />
            </span>
          </li>
          <li>
            <span>🙋🏻‍♂️ Your expense</span>
            <span>
              <input type="number" id="yourBill" value={""} />
            </span>
          </li>
          <li>
            <span>🫂 "Friend's" Expense</span>
            <span>
              <input type="number" disabled value={""} />
            </span>
          </li>
          <li>
            <span>💲 Who is paying the bill ?</span>
            <span>
              <select>
                <option value={"you"}>You</option>
                <option value={"Friend Name"}></option>
              </select>
            </span>
          </li>
          <li>
            <button type="submit">Split Bill</button>
          </li>
        </ul>
      </form>
    </div>
  );
}

function AddFriend() {
  return (
    <div className="friend-card-wrapper">
      <ul className="bill-inputs">
        <li>
          <span>🕺 Friend Name</span>
          <span>
            <input type="text" />
          </span>
        </li>
        <li>
          <span>🏞️ Image URL</span>
          <span>
            <input type="text" />
          </span>
        </li>
        <li>
          <button>Add Friend</button>
        </li>
      </ul>
    </div>
  );
}
