-- CreateTable
CREATE TABLE "public"."DecisionRoom" (
    "room_id" TEXT NOT NULL,
    "room_code" TEXT NOT NULL,
    "ahp_aggregated_summary_id" TEXT NOT NULL,
    "ahp_goal" TEXT NOT NULL,
    "ahp_criteria_set" JSONB NOT NULL,
    "ahp_alternatives_set" JSONB NOT NULL,
    "ahp_do_cost_benefit_analysis" BOOLEAN NOT NULL,
    "require_respondent_names" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "DecisionRoom_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "public"."AHPJudgements" (
    "ahp_judgement_id" TEXT NOT NULL,
    "room_code" TEXT NOT NULL,
    "ahp_judgement_pairwise_matrix" JSONB NOT NULL,
    "ahp_alternative_comparison_matrices" JSONB NOT NULL,
    "ahp_final_scoring_matrix" JSONB NOT NULL,
    "ahp_consistency_ratio" DOUBLE PRECISION NOT NULL,
    "ahp_eigenvector_set" JSONB NOT NULL,
    "respondent_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AHPJudgements_pkey" PRIMARY KEY ("ahp_judgement_id")
);

-- CreateTable
CREATE TABLE "public"."AHPAggregatedSummary" (
    "ahp_aggregated_sum_id" TEXT NOT NULL,
    "room_code" TEXT NOT NULL,
    "ahp_aggregated_pairwise_matrix" TEXT NOT NULL,
    "ahp_aggregated_final_scoring_matrix" JSONB NOT NULL,
    "ahp_aggregated_pairwise_criterion_variance" JSONB NOT NULL,
    "ahp_aggregated_cost_benefit_ratios" JSONB,
    "ahp_aggregated_eigenvector_set" JSONB NOT NULL,
    "total_respondents" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "AHPAggregatedSummary_pkey" PRIMARY KEY ("ahp_aggregated_sum_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DecisionRoom_room_code_key" ON "public"."DecisionRoom"("room_code");
