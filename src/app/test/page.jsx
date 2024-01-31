"use client"
import message from "@/components/Notifications/Message";
import Button from "@/components/Button/Button";

export default function Page() {
  const onClick = ()  => {
    message.info('测试')
  }

  return (
    <Button onClick={onClick}>点击</Button>
  )
}
