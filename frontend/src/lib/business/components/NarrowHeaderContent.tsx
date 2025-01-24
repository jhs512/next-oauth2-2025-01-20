"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LoginMemberContext } from "@/stores/auth/loginMember";
import { Menu } from "lucide-react";
import { use } from "react";
import Logo from "./Logo";
import MeMenuButton from "./MeMenuButton";
import ThemeToggleButton from "./ThemeToggleButton";

export default function NarrowHeaderContent({
  className,
}: {
  className?: string;
}) {
  const { isLogin } = use(LoginMemberContext);

  return (
    <div className={`${className} py-1`}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="link">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>전체 메뉴</DrawerTitle>
          </DrawerHeader>
          <div className="max-h-[calc(100dvh-150px)] px-2 overflow-y-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            recusandae laudantium veritatis incidunt officia fugit ab
            dignissimos ad enim! Tempora assumenda reiciendis quae aliquid
            doloribus voluptates et consequuntur vitae earum? Eveniet similique
            perferendis esse, quibusdam libero voluptatibus tempora,
            necessitatibus mollitia possimus perspiciatis non dolorem! Unde
            inventore reiciendis dolorum, non architecto temporibus dicta, rem
            quas, quisquam nostrum eveniet quidem necessitatibus enim. Tenetur
            aperiam doloremque saepe ea, odio esse nulla amet iste quam libero
            consequuntur aut fugiat aliquid reprehenderit aliquam suscipit
            accusamus minus dignissimos laudantium dicta provident magnam magni
            exercitationem quasi. Assumenda. Vitae laboriosam quaerat debitis
            laudantium obcaecati accusamus? Aperiam suscipit cupiditate libero
            in nulla nesciunt, fugit dolores exercitationem labore architecto
            odio repellat ullam. Officiis sint voluptate labore ea tempore,
            facilis impedit. Tempore nulla veritatis amet dolore molestiae velit
            dolores assumenda modi ut ex officia fuga et placeat eius quam,
            consequatur numquam repellendus eos voluptas ea quod iure? Itaque
            dolorum esse consequatur. Alias eius accusantium deserunt
            perspiciatis expedita! Iusto corrupti ab ratione eum itaque autem a
            libero placeat alias? Odio hic quis, in eos reiciendis illum ullam
            nulla officiis. Voluptatem, sequi laborum! Enim consequatur dicta
            ipsum, quasi expedita sint soluta maiores adipisci? Architecto vero
            iusto, iure natus tempora nulla cumque in eveniet odit recusandae a
            alias vel porro culpa possimus laboriosam? Adipisci. Nostrum illo
            maxime exercitationem eveniet quo voluptatum amet illum cumque,
            veniam obcaecati. Fugiat, alias. Sunt recusandae est, dicta totam
            exercitationem corrupti aliquam expedita temporibus cum facere porro
            tempora illum voluptate. Natus odio tenetur omnis, a, perspiciatis
            in, aliquid accusamus vel facere ad quasi eveniet non qui laborum
            neque. Earum assumenda voluptate quasi repellendus sint repellat
            consequatur laboriosam commodi nisi perferendis. Repudiandae dolorum
            provident reprehenderit fugiat? Reprehenderit numquam corrupti
            voluptatem molestias, modi dolorum quam hic non. Nulla reprehenderit
            facere nobis incidunt commodi illum repellat quas consequatur
            nostrum, ad illo ducimus iure.
          </div>
        </DrawerContent>
      </Drawer>

      <Button variant="link" asChild>
        <Logo />
      </Button>
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  );
}
