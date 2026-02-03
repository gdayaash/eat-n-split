import { useState } from "react";

const initialMembers = [
  { name: "Scarlett", id: 1, image_url: "https://i.pravatar.cc" },
  { name: "Eugene", id: 2, image_url: "https://i.pravatar.cc" },
  { name: "Frozen", id: 3, image_url: "https://i.pravatar.cc" },
];

export default function App() {
  const [members, setMembers] = useState(() => initialMembers);
  const [select, setSelect] = useState(null);
  const [bill, setBill] = useState(0);
  const [sbill, setSBill] = useState(0);
  const [payer, setPayer] = useState("you");
  const [add, setAdd] = useState(false);
  const [desc, setDesc] = useState("Both are Even");

  function handleCardSubmit(id, name) {
    // setSelect(id);
    setSelect((prevID) => (prevID?.id === id ? null : { id, name }));
  }

  function handleBill(e) {
    console.log(e);
    setBill(e);
  }

  function handleSbill(e) {
    console.log(e);
    setSBill(e);
  }

  function handlePayer(payer) {
    setPayer(payer);
  }

  function handleAddFriend() {
    setAdd((prev) => !prev);
    console.log(add);
  }

  function handleDesc(friendName) {
    if (payer === friendName) {
      console.log("Submit ID: " + select.id);
      setDesc(`You owe ${friendName} Rs.${sbill}/-`);
    } else if (payer === "you") {
      console.log("Submit ID: " + select.id);
      setDesc(`${friendName} owes You Rs.${splitBill}/-`);
    }
  }

  function handleAddMembers(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const userImage = formData.get("image_url");
    const addMemObj = {
      name: name,
      id: members.length + 1,
      image_url: userImage,
    };
    console.log(addMemObj);
    setMembers((prev) => [...prev, addMemObj]);
    setAdd(false);
    console.log(members);
  }

  let splitBill = Math.abs(bill - sbill);
  // const friendsName = members.map((e) => e.name);

  return (
    <section>
      <main>
        <h1>Eat-N-Split</h1>
        <Usercard
          members={members}
          handleCardSubmit={handleCardSubmit}
          select={select}
          desc={desc}
        />

        {select !== null && (
          <BillCard
            members={members}
            bill={bill}
            setBill={handleBill}
            sbill={sbill}
            setSBill={handleSbill}
            splitBill={splitBill}
            select={select}
            setSelect={handleCardSubmit}
            payer={payer}
            setPay={handlePayer}
            handleDesc={handleDesc}
          />
        )}

        <Addbutton add={add} setAdd={handleAddFriend} />

        {add && <AddFriend members={members} addMem={handleAddMembers} />}
      </main>
    </section>
  );
}

function Usercard({ members, handleCardSubmit, select, desc }) {
  return (
    <section>
      {members.map((e) => (
        <Profile
          name={e.name}
          key={e.id}
          id={e.id}
          imageUrl={e.image_url}
          select={select?.id === e.id}
          handleSubmit={handleCardSubmit}
          desc={desc}
        />
      ))}
      {console.log(members)}
    </section>
  );
}

function Profile({ name, id, handleSubmit, select, imageUrl, desc }) {
  return (
    <article className="user-card">
      <aside className="profile-info">
        <span>
          <img src={imageUrl + "/150?u=" + crypto.randomUUID()} alt={name} />
          {console.log(imageUrl)}
        </span>
        <span className="content-box">
          <p>{name}</p>
          <p>{select ? desc : "Both are Even"}</p>
        </span>
      </aside>

      <aside>
        <button onClick={() => handleSubmit(id, name)}>
          {select ? "Close" : "Select"}
        </button>
      </aside>
    </article>
  );
}

function BillCard({
  bill,
  setBill,
  sbill,
  setSBill,
  splitBill,
  members,
  select,
  handleDesc,
  payer,
  setPay,
}) {
  let selectedFriend = members.find((e) => e.id === select?.id);
  let friendName = selectedFriend?.name;
  console.log(friendName);

  return (
    <div className="card-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDesc(friendName);
        }}
      >
        <ul className="bill-inputs">
          <legend>Split With {friendName}</legend>
          <li>
            <span>💰 Bill value</span>
            <span>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </span>
          </li>
          <li>
            <span>🙋🏻‍♂️ Your expense</span>
            <span>
              <input
                type="number"
                id="yourBill"
                value={sbill}
                onChange={(e) =>
                  setSBill(
                    Number(e.target.value) > bill
                      ? sbill
                      : Number(e.target.value),
                  )
                }
              />
            </span>
          </li>
          <li>
            <span>
              🫂 {friendName === undefined ? `Friend's` : friendName} Expense
            </span>
            <span>
              <input type="number" disabled value={splitBill} />
            </span>
          </li>
          <li>
            <span>💲 Who is paying the bill ?</span>
            <span>
              <select value={payer} onChange={(e) => setPay(e.target.value)}>
                <option value={"you"}>You</option>
                <option value={friendName}>{friendName}</option>
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

function Addbutton({ add, setAdd }) {
  return (
    <button className="add-frnd" onClick={setAdd}>
      Add Friend
    </button>
  );
}

function AddFriend({ members, addMem }) {
  return (
    <div className="friend-card-wrapper">
      <form onSubmit={addMem}>
        <ul className="bill-inputs">
          <li>
            <span>🕺 Friend Name</span>
            <span>
              <input type="text" name="name" />
            </span>
          </li>
          <li>
            <span>🏞️ Image URL</span>
            <span>
              <input type="text" name="image_url" />
            </span>
          </li>
          <li>
            <button type="submit">Add Friend</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
