import { useState } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WORKER_API } from '@/lib/api';

const PERFIS = [
  { value: 'professor', label: 'Professor(a)' },
  { value: 'familiar', label: 'Familiar ou responsável' },
  { value: 'aluno', label: 'Aluno(a)' },
  { value: 'outro', label: 'Outro' },
];

// Botão que abre o formulário de inscrição no grupo de beta-testers do Capi-Aprende
const BetaTesterButton = ({ children = 'Quero ser beta-tester', ...props }: ButtonProps) => {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('');
  const [cidade, setCidade] = useState('');
  const [site, setSite] = useState(''); // armadilha para robôs: fica escondido
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!perfil) {
      setErro('Escolha seu perfil.');
      return;
    }
    setErro('');
    setEnviando(true);
    try {
      const resposta = await fetch(`${WORKER_API}/beta-capi-aprende`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, perfil, cidade, consentimento, site }),
      });
      const dados = await resposta.json().catch(() => ({}));
      if (!resposta.ok) throw new Error(dados.erro ?? 'Não foi possível concluir a inscrição.');
      setEnviado(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível concluir a inscrição.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Button {...props} onClick={() => setAberto(true)}>
        {children}
      </Button>

      <Dialog open={aberto} onOpenChange={setAberto}>
        <DialogContent className="max-w-md">
          {enviado ? (
            <>
              <DialogHeader>
                <DialogTitle>Inscrição recebida!</DialogTitle>
                <DialogDescription>
                  Recebemos a sua inscrição. A equipe entrará em contato em breve, pelo e-mail informado, para passar os próximos passos, como o acesso ao aplicativo. Enquanto isso, veja o tutorial.
                </DialogDescription>
              </DialogHeader>
              <Button onClick={() => setAberto(false)}>Fechar</Button>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Seja beta-tester do Capi-Aprende</DialogTitle>
                <DialogDescription>Preencha os dados e a equipe entrará em contato com os próximos passos.</DialogDescription>
              </DialogHeader>

              <form onSubmit={enviar} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="beta-nome">Nome</Label>
                  <Input id="beta-nome" value={nome} onChange={(e) => setNome(e.target.value)} required maxLength={120} autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-email">E-mail</Label>
                  <Input id="beta-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} autoComplete="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-perfil">Perfil</Label>
                  <Select value={perfil} onValueChange={setPerfil}>
                    <SelectTrigger id="beta-perfil">
                      <SelectValue placeholder="Escolha uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERFIS.map((p) => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-cidade">Cidade</Label>
                  <Input id="beta-cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required maxLength={120} autoComplete="address-level2" />
                </div>

                {/* Armadilha para robôs */}
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label htmlFor="beta-site">Site</label>
                  <input id="beta-site" tabIndex={-1} autoComplete="off" value={site} onChange={(e) => setSite(e.target.value)} />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="beta-consentimento" checked={consentimento} onCheckedChange={(v) => setConsentimento(v === true)} className="mt-1" />
                  <Label htmlFor="beta-consentimento" className="text-sm font-normal text-muted-foreground leading-snug">
                    Concordo que a equipe Capibots guarde meu nome, e-mail, perfil e cidade para enviar o login e falar sobre o teste do Capi-Aprende. Os dados não serão compartilhados nem usados para outra finalidade, e posso pedir a exclusão pelo e-mail equipecapibots@gmail.com. Se o participante for criança, a inscrição deve ser feita por um responsável.
                  </Label>
                </div>

                {erro && <p className="text-sm text-destructive" role="alert">{erro}</p>}

                <Button type="submit" className="w-full" disabled={enviando || !consentimento}>
                  {enviando ? 'Enviando...' : 'Quero participar'}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BetaTesterButton;
