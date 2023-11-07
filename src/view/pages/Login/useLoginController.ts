import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '../../../app/hooks/useAuth';
import { authService } from '../../../app/services/authService';
import { SigninParams } from '../../../app/services/authService/signin';

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail é inválido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    try {
      const { accessToken } = await mutateAsync(formData);

      signin(accessToken);
    } catch (error) {
      toast.error('Credenciais inválidas!');
    }
  });

  return { errors, handleSubmit, isPending, register };
}
