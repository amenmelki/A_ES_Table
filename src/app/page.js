import Image from "next/image";
import Table from "../../Components/commons/Table/Table";


export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',gap:'56px' }}>
      <img src="/Logo-menu-actia.png" alt="" layout="fill" style={{ maxWidth: '200px', display: 'flex', justifyContent: 'center' }} />
      <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <Table />

      </div>
    </div>
  );
}

