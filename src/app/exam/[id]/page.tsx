import { getExamById } from "@/data";
import { notFound } from "next/navigation";
import ExamComponent from "@/components/ExamComponent";

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const exam = getExamById(resolvedParams.id);
  
  if (!exam) {
    notFound();
  }

  return <ExamComponent exam={exam} />;
}
