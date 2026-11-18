import { Search, X, Plus, Check, Globe2, CreditCard, Gamepad2, ShieldCheck, Menu, Sparkles, Rotate3d, ChevronLeft, ChevronRight, Hand, MessageCircle, Phone, Mail, Eye, MoveUp, Info } from 'lucide-react';
const icons = { search: Search, close: X, plus: Plus, check: Check, globe: Globe2, card: CreditCard, game: Gamepad2, shield: ShieldCheck, menu: Menu, sparkle: Sparkles, flip: Rotate3d, previous: ChevronRight, next: ChevronLeft, hand: Hand, message: MessageCircle, phone: Phone, mail: Mail, eye: Eye, up: MoveUp, info: Info };
/** One bundled icon family keeps controls identical across browsers and phones. */
export function Icon({ name = 'sparkle', ...props }) {
  const Component = icons[name] || Sparkles;
  return <Component size={22} strokeWidth={1.7} aria-hidden="true" focusable="false" {...props} />;
}
