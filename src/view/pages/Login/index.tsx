import { Link } from 'react-router-dom';

import { Button } from 'src/view/components/Button';
import { Input } from 'src/view/components/Input';
import { InputPassword } from 'src/view/components/InputPassword';

import { useLoginController } from './useLoginController';

export function Login() {
  const { errors, handleSubmit, isPending, register } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-gray-900 font-bold tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span>

          <Link
            to="/register"
            className="tracking-[-0.5px] font-medium text-teal-900"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <Input
          type="email"
          label="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <InputPassword
          label="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2" isLoading={isPending}>
          Entrar
        </Button>
      </form>
    </>
  );
}
