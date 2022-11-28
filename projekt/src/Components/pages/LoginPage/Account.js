import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from("profiles")
        .select("login,password")
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setLogin(data.login);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
}
