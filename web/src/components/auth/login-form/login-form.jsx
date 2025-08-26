import { useForm } from "react-hook-form";


function LoginForm({ className = "" }) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all" });

  const onSubmitLogin = (user) => {
    // API CALL POST /sessions
    console.debug(user);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)} className={className}>

      {/* USERNAME */}
      <div className="input-group mb-1">
        <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
        <input type="text" 
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          placeholder="Username" 
          {...register("username", { required: "Username is required" })} 
        />
        { errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      {/* PASSWORD */}
      <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
        <input type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder="******"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      
      <button className="btn btn-primary fw-light w-100 btn-sm" type="submit" disabled={!isValid}>LOGIN</button>

    </form>
  )
}

export default LoginForm;