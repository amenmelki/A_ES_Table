"use client";
import { Button } from 'primereact/button';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToPage = (route) => {
    router.push(`/${route}`);
  }

  return (
    <body>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: "100vh", width: "100vw" }}>
        <div style={{ marginBottom: '90px' }}>
          <img src="/st_logo.png" alt="" style={{ height: '230px', width: '300px' }} /> 
        </div>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px", width: "350px" }}>
            <Button style={{ display: "flex", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "20px" }} onClick={() => navigateToPage("boards")}>Boards</Button>
            <Button style={{ display: "flex", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "20px" }} onClick={() => navigateToPage("setups")}>Setups</Button>
            <Button style={{ display: "flex", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "20px" }} onClick={() => navigateToPage("autoshields")}>Autoshields</Button>
          </div>
        </div>
      </div>
    </body>
  );
}