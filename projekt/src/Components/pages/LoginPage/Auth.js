import React from "react";
import { useState } from "react";
import { supabase } from "../../../supabase/config";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <from>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          isLoading={loading}
        >
          Zaloguj
        </button>
      </from>
    </div>
  );
}
