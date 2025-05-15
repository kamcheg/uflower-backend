import { Flower } from '../flowers/entities/flower.entity';
import { CreateOrderDto } from './dto/create-order.dto';

/**
 * Формирует текст сообщения о заказе
 */
export function formatOrderMessage(
  order: CreateOrderDto,
  flowers: Flower[],
): string {
  const lines: string[] = [];

  lines.push('🛒 *Новый заказ!*');
  lines.push('');
  lines.push(`👤 *Клиент:* ${order.customerName}`);
  lines.push(`📞 *Телефон клиента:* ${order.customerPhone}`);
  if (order.comment) lines.push(`💬 *Комментарий:* ${order.comment}`);
  lines.push('');

  lines.push(
    `📍 *Доставка:* ${order.isDeliverToCustomer ? 'Покупателю' : 'Получателю'}`,
  );
  lines.push(`🏠 *Адрес доставки:* ${order.address}`);
  if (!order.isDeliverToCustomer) {
    lines.push(
      `🎁 *Получатель:* ${order.recipientName} (${order.recipientPhone})`,
    );
  }

  lines.push('');
  lines.push('🌸 *Цветы в заказе:*');

  for (const item of order.orderFlowers) {
    const flower = flowers.find((f) => f.id === item.flowerId);
    const name = flower?.name ?? `#${item.flowerId}`;
    const price = flower?.price ?? 0;
    lines.push(`• ${name} — ${item.quantity} шт. × ${price}₽`);
  }

  const totalPrice = order.orderFlowers.reduce((sum, item) => {
    const flower = flowers.find((f) => f.id === item.flowerId);
    return sum + (flower?.price ?? 0) * item.quantity;
  }, 0); // TODO DECIMAL

  lines.push('');
  lines.push(`💰 *Итого:* ${totalPrice}₽`);

  return lines.join('\n');
}
