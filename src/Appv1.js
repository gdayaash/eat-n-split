import { useState } from "react";

const members = [
  { name: "Scarlett", id: 1 },
  { name: "Eugene", id: 2 },
  { name: "Frozen", id: 3 },
];

export default function App() {
  const [selection, setSelection] = useState(null);
  const [bill, setBill] = useState(0);
  const [selfBill, setSelfbill] = useState(0);
  const [payer, setPayer] = useState({ paidBy: "", sharedWith: "" });
  const [desc, setDesc] = useState(`All are Even`);

  function handleBill(value) {
    setBill(value);
  }
  function handleSelection(id, name) {
    setSelection((prevID) => (prevID === id ? null : { id, name }));
    console.log(selection);
  }

  function handleSubmit(e) {
    console.log(e.friendName);
    if (e?.friendName !== "you") {
      setDesc("You Owe Rs: " + e?.yourBill);
    } else {
      setDesc(e?.needPay + " owes you " + e?.spiltBill);
    }
  }

  return (
    <section>
      <main>
        <h1>Eat-N-Split</h1>
        {members.map((e) => (
          <Usercard
            key={e.id}
            id={e.id}
            name={e.name}
            desc={desc}
            status={selection?.id === e.id}
            handleSelection={handleSelection}
          />
        ))}
        {selection && (
          <BillCard
            name={selection.name}
            bill={bill}
            billChange={handleBill}
            selfBill={selfBill}
            selfBillChange={setSelfbill}
            payer={payer}
            setPay={setPayer}
            handleSubmit={handleSubmit}
            status={selection}
            handleSelection={handleSelection}
          />
        )}
        <AddFriend />
      </main>
    </section>
  );
}

function Usercard({ name, status, handleSelection, id, desc, setDesc }) {
  return (
    <article className="user-card">
      <aside className="profile-info">
        <span>
          <img src="https://i.pravatar.cc" alt={name} />
        </span>
        <span className="content-box">
          <p>{name}</p>
          <p>{desc}</p>
        </span>
      </aside>

      <aside>
        <button onClick={() => handleSelection(id, name)}>
          {status ? "Close" : "Select"}
        </button>
      </aside>
    </article>
  );
}

function BillCard({
  name,
  bill,
  billChange,
  status,
  handleSelection,
  selfBill,
  selfBillChange,
  payer,
  setPay,
  handleSubmit,
}) {
  let totalBill = bill;
  let yourBill = selfBill;
  let spiltBill = Math.abs(bill - selfBill);

  const calculatedData = {
    totalBill,
    yourBill,
    spiltBill,
    friendName: payer,
  };

  console.log(calculatedData);

  return (
    <div className="card-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(calculatedData);
        }}
      >
        <ul className="bill-inputs">
          <legend>Split With {name}</legend>
          <li>
            <span>💰 Bill value</span>
            <span>
              <input
                type="number"
                value={totalBill}
                onChange={(e) => billChange(e.target.value)}
              />
            </span>
          </li>
          <li>
            <span>🙋🏻‍♂️ Your expense</span>
            <span>
              <input
                type="number"
                id="yourBill"
                value={yourBill}
                onChange={(e) => selfBillChange(e.target.value)}
              />
            </span>
          </li>
          <li>
            <span>🫂 {name === undefined ? "Friend's" : name} Expense</span>
            <span>
              <input type="number" disabled value={spiltBill} />
            </span>
          </li>
          <li>
            <span>💲 Who is paying the bill ?</span>
            <span>
              <select
                value={payer}
                onChange={(e) => {
                  setPay({ paidBy: e.target.value });
                }}
              >
                <option value={"you"}>You</option>
                <option value={name}>{name}</option>
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
