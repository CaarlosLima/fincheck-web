import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from 'src/app/hooks/useAuth';
import { authService } from 'src/app/services/authService';
import { SignupParams } from 'src/app/services/authService/signup';

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail é inválido'),
  name: z.string().min(1, 'Nome é obrigatório'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (formData) => {
    try {
      const { accessToken } = await mutateAsync(formData);

      signin(accessToken);
    } catch (error) {
      toast.error('Ocorreu um erro ao criar sua conta!');
    }
  });

  return { errors, handleSubmit, isPending, register };
}
