
export default function Navbar(params : any) {

   /* const {data, error} =  supabase
        .from("User")
        .select("avatar")
        .eq('id', 'specific-user-id')
        .single()
        const userAvatar = data?.avatar;  
*/
     
    return <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
          <button className="btn btn-ghost" onClick={params.login}>
              Edit My Profile 
            </button>
            <image src="userAvatar"></image>
        </div>
    </div>
}
