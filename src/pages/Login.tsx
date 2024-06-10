import { Avatar, Button, Card, Checkbox, DarkThemeToggle, Label, TextInput } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import useErrorModal from 'hooks/useErrorModal';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FiAtSign } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login, user, isAuthenticated } = useAuth();
  const { setShowErrorModal, setErrorModalTitle, setErrorModalMessage, setErrorModalCloseButtonLabel, setOnCloseErrorModal } = useErrorModal();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value.trim());
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value.trim());
  const handleShowPasswordChange = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    if (user || isAuthenticated) {
      navigate('/history');
    }
  }, [isAuthenticated, navigate, user]);

  const handleShowErrorModal = (message: string) => {
    setErrorModalTitle('Error al Iniciar Sesión');
    setErrorModalMessage(message);
    setErrorModalCloseButtonLabel('Cerrar');
    setOnCloseErrorModal(() => () => setShowErrorModal(false));
    setShowErrorModal(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const isLogin = login(email, password);

      if (isLogin) {
        navigate('/history');
      } else {
        handleShowErrorModal('Credenciales incorrectas, por favor verifica tus datos e intenta nuevamente.');
      }
    }, 2_000);
  };

  const HideText = (
    <span className='flex items-center gap-2'>
      Ocultar contraseña <FaEyeSlash />
    </span>
  );

  const ShowText = (
    <span className='flex items-center gap-2'>
      Mostrar contraseña <FaEye />
    </span>
  );

  const LoadingSpinner = <AiOutlineLoading className='h-6 w-6 animate-spin' />;

  return (
    <main className='container mx-auto flex flex-grow flex-col items-center justify-center p-4'>
      <header className='mb-6 w-full'>
        <section className='mx-auto flex max-w-md items-center justify-evenly'>
          <Avatar img='/icons/icon-192.png' alt='logo' rounded />
          <span className='text-center text-2xl font-semibold'>Bank Kors</span>
          <DarkThemeToggle />
        </section>
      </header>
      <section className='w-full'>
        <Card className='mx-auto mt-4 max-w-md'>
          <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>Inicia sesión para acceder</h1>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email' value='Correo Electrónico' />
              </div>
              <TextInput
                id='email'
                value={email}
                type='email'
                placeholder='Ingresa tu correo electrónico'
                onChange={handleEmailChange}
                rightIcon={FiAtSign}
                shadow
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='password' value='Contraseña' />
              </div>
              <TextInput
                id='password'
                value={password}
                type={showPassword ? 'text' : 'password'}
                placeholder={showPassword ? 'Ingresa tu contraseña' : '••••••••'}
                rightIcon={RiLockPasswordFill}
                onChange={handlePasswordChange}
                shadow
                required
              />
            </div>

            <div className='flex items-center gap-2'>
              <Checkbox id='show-password' onChange={handleShowPasswordChange} />
              <Label htmlFor='show-password'>{showPassword ? HideText : ShowText}</Label>
            </div>

            <Button gradientMonochrome='success' type='submit' isProcessing={loading} processingSpinner={LoadingSpinner} className='mt-2'>
              Ingresar
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
};

export default Login;
