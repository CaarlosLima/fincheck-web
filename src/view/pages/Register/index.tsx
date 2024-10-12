import { Link } from 'react-router-dom';

import { Button } from 'src/view/components/Button';
import { Input } from 'src/view/components/Input';

import { useRegisterController } from './useRegisterController';

export function Register() {
  const { errors, handleSubmit, isPending, register } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-gray-900 font-bold tracking-[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Ja possui uma conta?
          </span>

          <Link
            to="/login"
            className="tracking-[-0.5px] font-medium text-teal-900"
          >
            Fazer login
          </Link>
        </p>
      </header>

      <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2" isLoading={isPending}>
          Criar conta
        </Button>
      </form>
    </>
  );
}
