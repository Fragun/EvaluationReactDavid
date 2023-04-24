import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import styles from '../register/Register.module.scss';
import { AuthContext } from "../../context";
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom';

export default function Login() {

  const { signin, user } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email non valide')
      .required('Ce champ doit être saisi'),
    password: Yup
      .string()
      .required('Required')
      .min(6, "Le mot de passe doit contenir 6 caractères min."),
  });

  const initialValues = {
    email: "",
    password: "",
  };


  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });



  const submit = handleSubmit(async (values) => {
    console.log(values);
    try {
      clearErrors();
      await signin(values);
    } catch (message) {
      setError("generic", { type: "generic", message })
    }
  });

  return (
    <>
      {user ? (
        <Navigate to="/profile" />
      ) :
        (
          <div className=" d-flex justify-content-center">
            <div className={`${styles.rectangle} m30`}>
              <h1 className="text-align-center">Connexion</h1>
              <form onSubmit={handleSubmit(submit)} className="d-flex flex-column justify-content-center align-items-center p20">

                <div className="d-flex flex-column">
                  <label htmlFor="email" className='mb10 pl20'>Email:</label>
                  <input type="email" className="form-control" name="email" {...register('email')} />
                  {errors?.email && <p className='form-error'>{errors.email.message}</p>}
                </div>

                <div className="d-flex flex-column mt10 mb20">
                  <label htmlFor="password" className="mb10 pl20">Mot de passe :</label>
                  <input type="password" name="password" {...register('password')} />
                  {errors.password && (
                    <p className="form-error">{errors.password.message}</p>
                  )}
                </div>
                {errors.generic && (
                  <p className="form-error">{errors.generic.message}</p>
                )}
                <div className="">
                  <button type="Se connecter" disabled={isSubmitting} className="btn btn-primary">
                    Se connecter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
};



