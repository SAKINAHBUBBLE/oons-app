import { notFound } from "next/navigation";
import { QuestionScreen } from "@/components/entre-nous/QuestionScreen";
import { QUESTION_SCREENS } from "@/data/question-screens";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";

function isValidCategory(value: string): value is EntreNousCategoryId {
  return value in QUESTION_SCREENS;
}

export default async function QuestionPage(props: PageProps<"/app/question/[category]">) {
  const { category } = await props.params;

  if (!isValidCategory(category)) {
    notFound();
  }

  return <QuestionScreen categoryId={category} />;
}
